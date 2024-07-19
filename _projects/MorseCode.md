---
name: Morse Code Detection using Fingers
tools: [Computer Vision]
image: assets/pngs/morsecode.PNG
description: It captures the Morse code pattern and detects the character based on the observed pattern
custom_js: 
---


### Real-Time Morse Code Detection Using Finger Gestures

<br>

#### Overview
This project introduces a method for interpreting Morse code through finger gestures, utilizing computer vision and machine learning techniques. This innovative system captures finger movements via a webcam, translates them into Morse code, and decodes them into text.

#### Technology Stack
- **Python 3**: Serves as the programming foundation.
- **OpenCV 4 & TensorFlow**: These libraries are crucial for image processing and machine learning operations, facilitating the detection of finger positions and movements.

#### How It Works
1. **Finger Detection**: The system starts by detecting the number of fingers shown to the camera. This process involves background subtraction and image segmentation to isolate the hand from the rest of the image.
2. **Morse Code Generation**: Depending on the number of fingers detected, different Morse code signals are generated—single finger for a dot, two fingers for a dash, and so forth.


![M1](https://raw.githubusercontent.com/RahulCvr/RahulCvr.github.io/main/assets/pngs/M1.PNG)

![M2](https://raw.githubusercontent.com/RahulCvr/RahulCvr.github.io/main/assets/pngs/M2.PNG)

![M3](https://raw.githubusercontent.com/RahulCvr/RahulCvr.github.io/main/assets/pngs/M3.PNG)

![M4](https://raw.githubusercontent.com/RahulCvr/RahulCvr.github.io/main/assets/pngs/M4.PNG)



#### User Interaction
- Users start by capturing a clean background, then switch to gesture mode to input Morse code.
- The interface displays several views: the raw camera feed, processed images showing hand segmentation, and the translation results in real-time.

#### Building the Solution
- A machine learning model was trained to identify the number of fingers extended using a publicly available dataset.
- Background subtraction combined with HSV segmentation isolates the hand within the video frame, which is then analyzed to predict finger count.

#### Conclusion and Future Directions
This project showcases the potential of integrating computer vision with user interaction to create accessible communication tools. Future enhancements may include refining the detection algorithms and expanding the system to interpret Morse code from other body movements, like eye blinks or facial expressions.