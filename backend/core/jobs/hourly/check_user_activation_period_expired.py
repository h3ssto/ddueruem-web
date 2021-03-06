from django_extensions.management.jobs import HourlyJob
from datetime import timedelta
from django.utils import timezone
from ddueruemweb.settings import PASSWORD_RESET_TIMEOUT_DAYS
from core.user.models import User
import logging

logger = logging.getLogger(__name__)


class Job(HourlyJob):
    """
    This job runs every hour and removes all inactive users where
    the activation period has passed.
    """
    help = "Check user activation period expired"

    def execute(self):
        logger.info("[CRONJOB] Starting cleanup user with expired activation period...")
        User.objects.filter(is_active=False,
                            date_joined__lte=timezone.now() - timedelta(days=PASSWORD_RESET_TIMEOUT_DAYS)).delete()
        logger.info("[CRONJOB] Done.")
        pass
