from flask import request
app = Flask(__name__)

@app.route('/py', methods=['POST', 'GET'])
def py():
	if (request.method == 'POST'):
		request.data
	return 'success'

if (__name__ == '__main__'):
	app.run()