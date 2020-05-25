from django.contrib import admin
from .models import Post

admin.site.register(Post)
#Как ты можешь заметить,
 #Post, которую определили в предыдущей главе.
  #Чтобы наша модель стала доступна на странице администрирования,
   #нам нужно зарегистрировать её при помощи admin.site.register(Post).
