import requests
import json


class sender():
    def __init__(self, port=8080):
        self.url = "http://localhost:{0}/python".format(port)
        self.headers = {
            'Content-type': 'application/json', 'Accept': 'text/plain'}

    def send(self, params):

        r = requests.post(self.url,
                          headers=self.headers, params=params)

        return r


a = sender()
res = a.send({'msg': 'a', 'r': 'b'})
print(res.text, res, res.url)
