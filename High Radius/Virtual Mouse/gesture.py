import cv2
import numpy as np
import HandTrackingModule as htm
import time
import pyautogui

##########################
wCam, hCam = 640, 480
frameR = 100

smoothening = 5
#########################

pTime = 0
plocX, plocY = 0, 0
clocX, clocY = 0, 0

cap = cv2.VideoCapture(0)
cap.set(3, wCam)
cap.set(4, hCam)
detector = htm.handDetector(maxHands=1)
wScr, hScr = pyautogui.size()

while True:

    # 1. Find hand Landmarks
    success, img = cap.read()
    img = detector.findHands(img)
    lmList, bbox = detector.findPosition(img)

    # 2. Get the tip of the index and middle fingers
    if len(lmList) != 0:
        x1, y1 = lmList[8][1:]
        x2, y2 = lmList[12][1:]
        x3, y3 = lmList[4][1:]

        # 3. Check which fingers are up
        fingers = detector.fingersUp()
        cv2.rectangle(img, (frameR, frameR), (wCam - frameR, hCam - frameR), (255, 0, 255), 2)

        # 4. Only Index Finger : Moving Mode
        if  fingers[0] == 0 and fingers[1] == 1 and fingers[2] == 0:

            # 5. Convert Coordinates
            x4 = np.interp(x1, (frameR, wCam - frameR), (0, wScr))
            y4 = np.interp(y1, (frameR, hCam - frameR), (0, hScr))

            # 6. Smoothen Values
            clocX = plocX + (x4 - plocX) / smoothening
            clocY = plocY + (y4 - plocY) / smoothening

            # 7. Move Mouse
            pyautogui.moveTo(wScr - clocX, clocY)
            cv2.circle(img, (x1, y1), 10, (255, 0, 255), cv2.FILLED)
            plocX, plocY = clocX, clocY

        # 8. Both Index and middle fingers are up : Clicking Mode
        if  fingers[0] == 0 and fingers[1] == 1 and fingers[2] == 1:

            # 9. Find distance between fingers
            length, img, lineInfo = detector.findDistance(8, 12, img)

            # 10. Left Click mouse if distance short
            if length < 10:
                cv2.circle(img, (lineInfo[4], lineInfo[5]),
                10, (0, 255, 0), cv2.FILLED)
                pyautogui.click()

        # 11. Both Thumb and Index fingers are up: Right Click Mode
        if fingers[0] == 1 and fingers[1] == 1 and fingers[2] == 0:

            # 12. Find distance between thumb and finger
            length, img, lineInfo = detector.findDistance(4, 8, img)

            # 13. Right Click mouse if distance short
            if length < 20:
                cv2.circle(img, (lineInfo[4], lineInfo[5]),
                           10, (0, 255, 0), cv2.FILLED)
                pyautogui.rightClick()

        # 14. Only Thumb is up: Scroll Mode
        if fingers[0] == 1 and fingers[1] == 0 and fingers[2] == 0:

            # 15. Convert Coordinates
            y4 = np.interp(y3, (frameR, hCam - frameR), (0, hScr))

            # 16. Scroll UP
            if y4 < (hScr / 2):
                pyautogui.scroll(25)
                cv2.circle(img, (x3, y3), 10, (255, 0, 255), cv2.FILLED)

            # 17. Scroll DOWN
            else :
                pyautogui.scroll(-25)
                cv2.circle(img, (x3, y3), 10, (255, 0, 255), cv2.FILLED)

    # 18. Frame Rate
    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.putText(img, str(int(fps)), (20, 50), cv2.FONT_HERSHEY_PLAIN, 3,
                (255, 0, 0), 3)
    # 19. Display
    cv2.imshow("Image", img)
    cv2.waitKey(1)