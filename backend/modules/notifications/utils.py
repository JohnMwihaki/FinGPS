from modules.notifications.models import Notification

def create_notification(user, message):
    """
    Creates a new notification for a specific user.
    """
    Notification.objects.create(user=user, message=message)
