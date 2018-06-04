import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
	DEBUG = False
	TESTING = False
	CSRF_ENABLED = True
	SECRET_KEY = '<\x04\xf6B\xdc\xa8tg\xa8\xd8\x13\xc41\xc5]\x96O\x9eaT\x047D\x0b'


class ProductionConfig(Config):
	DEBUG = False


class StagingConfig(Config):
	DEVELOPMENT = True
	DEBUG = True


class DevelopmentConfig(Config):
	DEVELOPMENT = True
	DEBUG = True


class TestingConfig(Config):
	TESTING = True
