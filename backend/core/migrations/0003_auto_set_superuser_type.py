from django.db import migrations

def set_superuser_type(apps, schema_editor):
    User = apps.get_model('core', 'User')
    User.objects.filter(is_superuser=True).update(user_type='ADMIN')

def reverse_superuser_type(apps, schema_editor):
    pass

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0002_listing'),  # Update this to point to your latest migration
    ]

    operations = [
        migrations.RunPython(set_superuser_type, reverse_superuser_type),
    ] 