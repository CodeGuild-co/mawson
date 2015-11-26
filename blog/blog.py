from flask import Flask, render_template, request
from flaskext.markdown import Markdown

app = Flask(__name__)
Markdown(app)

@app.route('/')
def home():
    	return render_template('home.html')

@app.route('/posts/<name>/')
def posts(name):
	return render_template('posts/%s.html' % name)

@app.route('/write')
def write():
     return render_template('write/index.html', author = 'Matthew')

@app.route('/write', methods=['POST'])
def writepost():
    with open('blog/templates/posts/templatetop.html', 'r') as g:
        with open('blog/templates/posts/templatebottom.html', 'r') as e:
            with open('blog/templates/posts/%s.html', 'w' % request.form['title'] ) as f:
                f.write(g.read() + request.form['text'] + e.read())
            return render_template('%s.html' % request.form['title'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
