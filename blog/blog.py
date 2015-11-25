from flask import Flask, render_template
from flaskext.markdown import Markdown

app = Flask(__name__)
Markdown(app)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/posts/<name>/')
def posts(name):
	return render_template('posts/%s.html' % name)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
