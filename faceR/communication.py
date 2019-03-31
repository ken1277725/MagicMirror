import requests
import json
#from socketio_client import SocketIO, LoggingNamespace
import sys
import json
from datetime import datetime


class sender():
    def __init__(self, port=3001):
        #self.url = "http://localhost:{0}/python".format(port)
        self.url = "http://localhost:3001"
        self.headers = {
            'Content-type': 'application/json', 'Accept': 'text/plain'}

    def send(self, params):
        print("params:", params)
        requests.post(self.url, data=json.dumps(params), headers=self.headers)
        print("sended")


#a = sender()
#res = a.send({'msg': 'a', 'r': 'b'})
#print(res.text, res, res.url)
