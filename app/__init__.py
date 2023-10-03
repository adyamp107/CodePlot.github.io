import mimetypes
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/png', '.png')
from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from app import routes
