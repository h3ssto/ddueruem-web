# Generated by Django 3.2.8 on 2022-06-20 11:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core_analysis', '0002_dockerprocess_file_to_analyse'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='dockerprocess',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='analysis',
            name='process',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core_analysis.dockerprocess'),
        ),
    ]
