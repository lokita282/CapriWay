# Generated by Django 4.1.12 on 2023-11-02 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0002_delete_shopdesigns_desginerupload_isapproved_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='desginerupload',
            old_name='isPremimum',
            new_name='isPremium',
        ),
    ]
