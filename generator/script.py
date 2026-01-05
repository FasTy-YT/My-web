from browser import document
import string
import random

class Genrator:
    def __init__(self):
        self.symbols = string.ascii_letters + string.digits + "!@#$%^&*"
        self.password = ""
    def generate(self, event=None):
        length_str = document["input"].value
        if length_str:
            length = int(length_str)

        for _ in range(length):
            symbol = random.choice(self.symbols)
            self.password += symbol
            print(self.password)

        print("="*50)
        print(f"Password is: {self.password}")
        print("="*50)
        self.update_display(self.password)

    def update_display(self, password):
        document["result"].text = f"Ваш пароль: {password}"
        self.password = ""

gen = Genrator()

document["generate-btn"].bind("click", lambda event: gen.generate())