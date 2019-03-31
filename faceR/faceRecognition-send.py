''''
Real Time Face Recogition
	==> Each face stored on dataset/ dir, should have a unique numeric integer ID as 1, 2, 3, etc
	==> LBPH computed model (trained faces) should be on trainer/ dir
Based on original code by Anirban Kar: https://github.com/thecodacus/Face-Recognition

Developed by Marcelo Rovai - MJRoBot.org @ 21Feb18

'''
from communication import sender
import cv2
import numpy as np
import os
import time
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('trainer/trainer.yml')
cascadePath = 'haarcascade_frontalface_default.xml'
faceCascade = cv2.CascadeClassifier(cascadePath)

font = cv2.FONT_HERSHEY_SIMPLEX

# iniciate id counter
id = 0

# names related to ids: example ==> Marcelo: id=1,  etc
names = ['None', 'Starla', 'Eccioa', 'Ken', 'Z', 'W']

# Initialize and start realtime video capture
cam = cv2.VideoCapture(0)
cam.set(3, 640)  # set video widht
cam.set(4, 480)  # set video height

# Define min window size to be recognized as a face
minW = 0.1*cam.get(3)
minH = 0.1*cam.get(4)
arr = [0]*10
b = [0.5] * 10
alpha = 0.3
while True:
    arr = [0]*10
    # arr[1] = 1
    # arr = [0]*10
    ret, img = cam.read()
    # img = cv2.flip(img, -1)  # Flip vertically

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=5,
        minSize=(int(minW), int(minH)),
    )

    for(x, y, w, h) in faces:

        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

        id, confidence = recognizer.predict(gray[y:y+h, x:x+w])

        # Check if confidence is less them 100 ==> "0" is perfect match
        if (confidence < 100):
            # print(id)
            arr[id] = 1
            id = names[id]

            confidence = "  {0}%".format(round(100 - confidence))
        else:
            id = "unknown"
            confidence = "  {0}%".format(round(100 - confidence))

        cv2.putText(img, str(id), (x+5, y-5), font, 1, (255, 255, 255), 2)
        cv2.putText(img, str(confidence), (x+5, y+h-5),
                    font, 1, (255, 255, 0), 1)
    for i in range(len(b)):
        b[i] = (1-alpha) * b[i] + alpha*arr[i]
    print(b)
    sendman = sender()
    time.sleep(0.3)
    A = 0
    for i in range(len(b)):
        if(b[i] > 1e-5):
            A = 1
        if(b[i] > 0.97):
            print("send", names[i])
            sendman.send({"id": i, "name": names[i]})
            time.sleep(5)
            b = [0.5] * 10
    if(A == 0):
        sendman.send({"id": -1, "name": "leave"})
        time.sleep(5)
print("\n [INFO] Exiting Program and cleanup stuff")
cam.release()
cv2.destroyAllWindows()
