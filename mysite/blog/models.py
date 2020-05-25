from django.conf import settings
from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200) #так мы определяем текстовое поле с ограничением на количество символов
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self): # Это как раз метод публикации для записи, о котором мы говорили. def означает, что создаётся функция/метод, а publish — это название этого метода
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
