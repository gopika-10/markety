from rest_framework import viewsets
from .models import Stock
from .serializers import StockSerializer
class StockViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing stock instances.
    """
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
