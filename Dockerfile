FROM nexus.mia-platform.eu/core/static-files:3.2.2 as build

WORKDIR /build-dir

COPY ./build .

COPY LICENSE .

RUN echo ": $COMMIT_SHA" >> ./commit.sha

################################################################################à

FROM nexus.mia-platform.eu/core/static-files:3.2.2

LABEL name="%CUSTOM_PLUGIN_SERVICE_NAME%" \
      description="%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="0.1.0"

COPY nginx/website.conf ./conf.d/website.conf

WORKDIR /usr/static

COPY --from=build /build-dir ./
