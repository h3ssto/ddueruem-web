from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group
from django.core.mail import send_mail
from django.db import models
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags

from core.auth.tokens import encode_user_to_token
from ddueruemweb.settings import env


class UserManager(BaseUserManager):
    use_in_migrations = True

    def save_user(self, email, password, **kwargs):
        """
        Saves an user with the given attributes to the database
        """
        if email is None:
            raise TypeError('Email for user is not set')
        if password is None:
            raise TypeError('Password for user is not set')

        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)

        # Call this method for password hashing
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **kwargs):
        """
        Creates an user with the given attributes
        """
        kwargs.update({
            'is_superuser': False,
            'is_staff': False,
            'is_active': False
        })
        return self.save_user(email, password, **kwargs)

    def create_staffuser(self, email, password, **kwargs):
        """
        Creates an user with activated staff flag and the given attributes
        """
        kwargs.update({
            'is_superuser': False,
            'is_staff': True,
            'is_active': False
        })
        return self.save_user(email, password, **kwargs)

    def create_superuser(self, email, password, **kwargs):
        """
        Creates a superuser with the given attributes
        """
        kwargs.update({
            'is_superuser': True,
            'is_staff': True,
            'is_active': True
        })
        return self.save_user(email, password, **kwargs)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField('date joined', auto_now_add=True, editable=False)
    institute = models.CharField(max_length=255, unique=False, blank=True)
    bio = models.TextField(max_length=500, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def send_link_to_file(self, data):
        """
        Send predefined email with link to File after successful upload.
        """
        token = {
            'file_id': data.get('id', None),
            'timestamp': str(timezone.now()),
            'purpose': 'upload_confirm',
        }
        protocol = 'http'
        user = self
        html_message = render_to_string('email/user_upload_email.html', {
            'user': str(user.email),
            'protocol': protocol,
            'file_domain': str(data.get('local_file')),
            'file_name': str(data.get('local_file')).split('/')[-1],
            'confirm_link': f"{protocol}://{env('FRONTEND_URL')}/files/uploaded/unconfirmed/confirm/{encode_user_to_token(token)}",
            'delete_link': f"{protocol}://{env('FRONTEND_URL')}/files/uploaded/unconfirmed/{data.get('id')}",
        })
        plain_message = strip_tags(html_message)

        user._email_user('DDueruem File Upload', plain_message, html_message=html_message)

    def send_activation_link(self):
        """
        Send predefined activation email this user.
        It is a method to make resending in e.g. admin view easier
        """
        user = self
        extended_user = {
            'id': str(user.id),
            'email': str(user.email),
            'timestamp': str(timezone.now()),
            'purpose': 'user_activation'
        }
        link = f"http://{env('FRONTEND_URL')}/register/{encode_user_to_token(extended_user)}"
        html_message = render_to_string('email/user_activation_email.html', {
            'user': str(user.email),
            'link': link
        })
        plain_message = strip_tags(html_message)
        user._email_user("DDueruem Account Activation", plain_message, html_message=html_message)

    def _email_user(self, subject, message, from_email="noreply@uni-ulm.de", **kwargs):
        """
        Sends an email to this user
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        return f"{self.email}"
