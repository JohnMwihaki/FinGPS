import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Automatically creates a production superuser if it does not exist'

    def handle(self, *args, **options):
        User = get_user_model()
        username = 'JohnK'
        email = 'zakariaabdullahi07@gmail.com' 
        password = 'Kimani@4383'

        if not User.objects.filter(username=username).exists():
            self.stdout.write(f'Creating superuser {username}...')
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created superuser {username}'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Superuser {username} already exists.'))
