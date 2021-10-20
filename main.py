from flask import Flask, render_template, abort, request, url_for, send_file, send_from_directory
import logging

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask('Portfolio', static_url_path='', static_folder="static")

@app.route('/')
def index():
  return send_file('index.html')
  
@app.route('/<name>.css')
def style(name):
  try:
    return send_file(name+'.css')
  except:
    return abort(404)

@app.route('/robots.txt')
def robots():
  return send_file('robots.txt')

@app.route('/banano.json')
def banano_json():
  return send_file('banano.json')

@app.route('/docs/gobanme.html')
def gobanme_TEMPFIX():
  return send_from_directory("static/docs/gobanme","index.html")

@app.route('/subdomains.txt')
def subdomain():
  return send_file('subdomains.txt')

@app.route('/favicon.ico')
def favicon():
  return send_file('favicon.ico')

@app.route('/to/<file>')
def redirects(file):
  return send_from_directory("to",file+".html")

@app.route('/api/<file>')
def api(file):
  return send_from_directory("api",file)

app.run(host='0.0.0.0', port=8080)