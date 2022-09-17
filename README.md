```
modular-sns
│   README.md
│   .gitignore  
└─── crawler-server <- python server (backend)
    │   app.py <- running flask application
    |   requirements.txt <- The package for the project is specified.
```
## How to setup python server development environment?
1. change directory crawler-server
   > ```cd crawler-server```
2. install python virtualenv
   - [what is virtaulenv?](https://www.daleseo.com/python-venv/)
   - [how to setup virtaulenv?](https://flask.palletsprojects.com/en/2.2.x/installation/)
3. setup virtualenv environment (commands below)
    > ```py -3 -m venv .venv```

    > ```source .venv/Scripts/activate```

    > ``` which python ```
4. let install python packages in requirements.txt
   >``` pip install -r requirements.txt```
5. Open Directory to crawler-server
6. enjoy to development

# Guides
**[Flask Documents](https://flask.palletsprojects.com/en/2.2.x/)**

**[BeautifulSoup4 Documents](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)**
