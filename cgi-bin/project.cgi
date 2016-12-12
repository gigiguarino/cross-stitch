#!/usr/bin/python
from wsgiref.handlers import CGIHandler
from project import app 

CGIHandler().run(app)
