from typing import Dict
from django.http import JsonResponse
from rest_framework import status


def create_just_data_response(data: Dict, status_code=status.HTTP_200_OK):
    return JsonResponse(
        {
            'data': data
        },
        status=status_code,
    )

def create_just_error_response(error: str, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR):
    return JsonResponse(
        {
            'error': error,
        },
        status=status_code
    )
