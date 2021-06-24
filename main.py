from flask import Flask, render_template, abort, request, url_for, send_file, send_from_directory

app = Flask('Portfolio', static_url_path='')

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

@app.route('/subdomains.txt')
def subdomain():
  return send_file('subdomains.txt')

@app.route('/favicon.ico')
def favicon():
  return send_file('favicon.ico')

@app.route('/to/<file>')
def redirects(file):
  return send_from_directory("to",file+".html")

app.run(host='0.0.0.0', port=8080)