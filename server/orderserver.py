#! /usr/bin/env python3
"""
A minimalistic web server that receives orders from an e-commerce web frontend
@author chilowi at u-pem.fr

How to use it?
> python3 orderserver.py <port of the server> <data directory>
Prior running the server, you must have Python 3 and the Flask framework installed.
If you don't have Flask, you can install it using pip: 
> pip3 install Flask

The data directory is where the orders are saved as a JSON file.
The name of the file follows this format including the date of receival of the order: YYYY-MM-DD-THHMMSS.order.json

To post a new order, we emit a POST request to the following path:
POST /order
The order is sent in the body of the request as JSON data (string encoded in UTF-8)
We can test with curl:
curl -X POST -H "Content-Type: application/json" --data-binary "@/path/to/test/file" http://localhost:2020/order

The server checks that the posted JSON data are valid and contain a basket and address entry (but checking is not done more deeply)
"""

from flask import Flask, request, make_response, Response, escape, send_file
import os, sys, json, hashlib, re, datetime

app = Flask(__name__)

# to avoid CORS errors
@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/")
def index():
	return Response("Post an order to the /order path!", mimetype="text/plain")

@app.route("/order", methods=["OPTIONS"])
def sendOrderOptions():
	response = make_response()
	for header in ["Origin", "Headers", "Methods"]:
		response.headers.add("Access-Control-Allow-{}".format(header), "*")
	return response
	
@app.route("/order", methods=["POST"])
def sendOrder():
	response = None
	code = 500
	if not request.content_type.startswith('application/json'):
		response = "sent data must use application/json content type"
	else:
		# interpret the body as JSON
		try:
			json_data = json.loads(request.get_data())
		except:
			response = "invalid_json"
		else:
			try:
				basket = json_data["basket"]
				address = json_data["address"]
			except KeyError:
				response = "incomplete_data"
			else:
				# reconvert data to JSON
				now = datetime.datetime.now()
				data2 = {"basket": basket, "address": address, "metadata": {
					"date": now.isoformat(timespec="seconds"),
					"ip": request.remote_addr,
					"user-agent": request.headers.get('User-Agent') }}
				with open(os.path.join(app.config["datadir"], "{}.order.json".format(now.strftime("%Y-%m-%dT%H%M%S"))), "w") as f:
					json.dump(data2, f)
				response = "order_received"
				code = 200
	r = make_response(json.dumps({"status": response}), code)
	r.headers["Content-Type"] = "application/json"
	return r


if __name__ == "__main__":
	try:
		(port, datadir) = (int(sys.argv[1]), sys.argv[2])
	except:
		print("Usage: {} port datadir".format(sys.argv[0]))
		sys.exit(-1)
	else:
		app.config.update(datadir=datadir)
		# run the server
		app.run(port=port)
