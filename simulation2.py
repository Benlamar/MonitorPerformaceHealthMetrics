import random
from time import sleep
import sys
import socketio

# socket IO
sio = socketio.Client()

@sio.event
def connect():
   print("Connected to the server.")
   
@sio.event
def disconnect():
   print("Disconnected from the server.")
   
@sio.event
def deviceResponse(data):
   print('Received response from server:', data)
   
# different modes
modes = ['sleep', 'walk', 'rest', 'run']

# averages vales at different state for different properties
heart_rate_ranges = {
   'sleep': (62, 70),
   'walk': (70, 80),
   'rest': (70, 78),
   'run': (80, 100)
}

blood_pressure_ranges = {
   'sleep': (100, 120),
   'walk': (110, 130),
   'rest': (100, 120),
   'run': (120, 140)
}

oxygen_level_ranges = {
   'sleep': (95, 100),
   'walk': (96, 100),
   'rest': (95, 100),
   'run': (97, 100)
}

def get_distance_walked(mode):
    if mode == 'sleep':
        return 0
    elif mode == 'walk':
        return random.randint(1, 4) # walk covers 1 to 5 units of distance
    elif mode == 'rest':
        return 0
    elif mode == 'run':
        return random.randint(5, 10) # run covers 5 to 10 units of distance

def get_heart_rate(mode):
    return random.randint(*heart_rate_ranges[mode])

def get_blood_pressure(mode):
    return random.randint(*blood_pressure_ranges[mode])

def get_oxygen_level(mode):
    return round(random.uniform(*oxygen_level_ranges[mode]), 2)

# generator for the health data
def health_data_generator(mode):
    while True:
        heart_rate = get_heart_rate(mode)
        blood_pressure = get_blood_pressure(mode)
        oxygen_level = get_oxygen_level(mode)
        distance_walked = get_distance_walked(mode)
        yield heart_rate, blood_pressure, oxygen_level, distance_walked

# Get the mode from user input
user_mode = input("Enter the mode (sleep, walk, rest, run): ")
if user_mode not in modes:
    print("Invalid mode")
    sys.exit()

# Initialize the distance walked
distance_walked = 0
health_data = health_data_generator(user_mode)

sio.connect('http://localhost:8080')

while True:
    if not sio.connected:
        break
    try:
        heart_rate, blood_pressure, oxygen_level, distance = next(health_data)
        distance_walked += distance
        data = {
            "heartbeat": heart_rate, 
            "blood_pressure": blood_pressure,
            "oxygen_level": oxygen_level, 
            "distance": distance_walked,
            "mode":user_mode
        }
        sio.emit('device', data)
        sleep(2)
    except KeyboardInterrupt as ex:
        print("Stop the simulation")
        break

sio.disconnect()