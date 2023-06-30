from django.shortcuts import render
from .models import Task
from django.http import JsonResponse
#from django.core import serializers
# Create your views here.

def index(request):
    context = {}
    return render(request, "index.html", context)

def task_all(request):
    if request.method == "POST":
        tk = Task()
        tk.title = request.POST.get("title")
        tk.save()
        return JsonResponse({
            "id": tk.id, 
            "title": tk.title, 
            "completed": tk.completed
        })

    else: 
        t = Task.objects.all()
        # tt = serializers.serialize('json', t)
        tobjects = []
        for x in t:
            tobjects.append({
                'id': x.id,
                'title': x.title,
                'completed': x.completed
            })

        return JsonResponse(tobjects, safe = False)

def task_toggle(request, task_id):
    tk = Task.objects.get(id = task_id) 
    tk.completed = not tk.completed #de False a True y True a False si la tarea esta o no hecha
    tk.save() #guardo en base de datos

    return JsonResponse({
        "id": tk.id, 
        "title": tk.title, 
        "completed": tk.completed
    })

def task_edit(request, task_id):
    tk = Task.objects.get(id = task_id) #capturo el objeto task
    titulo = request.POST.get("title") #capturo el valor que envia el frontend
    tk.title = titulo #asigno titulo
    tk.save()

    return JsonResponse({
        "id": tk.id, 
        "title": tk.title, 
        "completed": tk.completed
    })

def task_delete(request, task_id):
    tk = Task.objects.get(id=task_id)
    tk.delete()
    return JsonResponse({"success": True}) 

def clear_completed(request):
    Task.objects.filter(completed=True).delete()
    return JsonResponse({"success": True})
