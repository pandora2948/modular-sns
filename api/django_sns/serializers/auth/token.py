from rest_framework_simplejwt.serializers import TokenObtainSerializer


"""
    !! 현재 사용중이 아닙니다. !!
    token 에 커스텀 값을 부여하고 반환합니다.
"""
class ModularSnsTokenObtainPairSerializer(TokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(ModularSnsTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
