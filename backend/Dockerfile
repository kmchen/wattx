FROM iron/base

EXPOSE 6768
ADD accountservice-linux-amd64 /

ADD healthchecker-linux-amd64 /
HEALTHCHECK --interval=3s --timeout=3s CMD ["./healthchecker-linux-amd64", "-port=6768"] || exit 1

ENTRYPOINT ["./accountservice-linux-amd64"]
