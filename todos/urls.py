from django.urls import path 

from todos.views import index, task_all, task_toggle, task_edit, task_delete, clear_completed

urlpatterns = [
    path('', index),
    path('task.json', task_all),
    path("task/<int:task_id>/toggle.json", task_toggle),
    path("task/<int:task_id>/edit.json", task_edit),
    path('task/<int:task_id>/delete.json', task_delete),
    path('task/<int:task_id>/clear_completed.json', clear_completed),
]