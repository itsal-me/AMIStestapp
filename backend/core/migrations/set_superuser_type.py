from django.db import migrations

def set_superuser_type(apps, schema_editor):
    User = apps.get_model('core', 'User')
    User.objects.filter(is_superuser=True).update(user_type='ADMIN')

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0001_initial'),  # Adjust this to your last migration
    ]

    operations = [
        migrations.RunPython(set_superuser_type),
    ] 