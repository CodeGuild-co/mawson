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

    texts = request.form['text']
    with open('blog/templates/posts/output.txt', 'w') as f:
        f.write('hello' + request.form['text'])
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
