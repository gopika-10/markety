from django.db import models

# Create your models here.
class Stock(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    as_of_date = models.DateField()
    momentum_returns = models.FloatField(default=0.0)
    momentum_score = models.FloatField(default=0.0)
    news_title = models.CharField(max_length=255, blank=True, null=True)
    news_description = models.TextField(blank=True, null=True)
    news_url = models.URLField(blank=True, null=True)
    pulse=models.CharField(max_length=255, blank=True, null=True)
    llm_explanation = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.ticker} - {self.as_of_date} - Pulse: {self.pulse}"

