```
|-- api <- python api server (django)
|   `-- src
|       |-- migrations <- database (mysql) migration scripts
|       |
|       `-- models <- db schema modeling scripts
`-- react-happy-hacking <- frontend web application ( react.js )
    |-- public <- includes public files
    `-- src <- web app source scripts
```
## How to setup python server development environment?
   1. change directory crawler-server
      > ```cd api```
   2. install python virtualenv
      - [what is virtaulenv?](https://www.daleseo.com/python-venv/)
   3. setup virtualenv environment (commands below)
      > ```py -3 -m venv .venv```

      > ```source .venv/Scripts/activate```

      > ``` which python ```
   4. let install python packages in requirements.txt
      >``` pip install -r requirements.txt```
   5. Open Directory to api
   6. running application
      > python manage.py runserver
   7. enjoy to development

# Guides
**[Django Korean Documents](https://docs.djangoproject.com/ko/4.1/)**

**[Antd Documents](https://ant.design/docs/react/introduce)**

