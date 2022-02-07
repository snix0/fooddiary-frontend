package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-gonic/contrib/static"
)

func main() {
    router := gin.Default()
    router.Use(static.Serve("/", static.LocalFile("./build", true)))
    router.Run(":80")
}
