call reset_migrations.bat
call typeorm migration:create -n empty
call typeorm.bat migration:generate -n init
call typeorm migration:create -n populate