from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_dance.contrib.google import make_google_blueprint, google
from flask import jsonify
from flask_mail import Mail, Message
from flask_login import login_user, logout_user, login_required

app = flask(__name__)

app.config['SECRET_KEY'] = 'a_random_secret_key_12345678'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False