from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import AsyncEngine

from alembic import context
import asyncio
import os
from app.db.models import Base
from app.core.config import DATABASE_URL

# this is the Alembic Config object
config = context.config

# set SQLAlchemy URL
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# interpret the config file for Python logging
fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_online():
    connectable = AsyncEngine(
        engine_from_config(
            config.get_section(config.config_ini_section),
            prefix='sqlalchemy.',
            poolclass=pool.NullPool,
            future=True
        )
    )

    async def do_run_migrations():
        async with connectable.connect() as conn:
            await conn.run_sync(lambda connection: context.run_migrations(connection=connection))

    asyncio.run(do_run_migrations())

run_migrations_online()