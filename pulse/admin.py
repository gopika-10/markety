from django.contrib import admin
from .models import Stock
@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = (
        'ticker',
        'as_of_date',
        'momentum_returns',
        'momentum_score',
        'news_title',
        'pulse',
    )

