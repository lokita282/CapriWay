from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):

    model = CustomUser

    list_display = ('username', 'email', 'role', 'is_active',
                    'is_staff', 'is_superuser', 'last_login',)
    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('username', 'email','password' ,'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
         'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)