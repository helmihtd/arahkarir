"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload } from "lucide-react"

interface ImageItem {
  id: string
  url: string
  alt: string
  file?: File
}

export default function ProfessionImagesForm() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      url: "/placeholder.svg?height=200&width=300",
      alt: "",
    },
  ])

  const addImage = () => {
    setImages([
      ...images,
      {
        id: Date.now().toString(),
        url: "/placeholder.svg?height=200&width=300",
        alt: "",
      },
    ])
  }

  const removeImage = (id: string) => {
    if (images.length > 1) {
      setImages(images.filter((item) => item.id !== id))
    }
  }

  const updateImageAlt = (id: string, alt: string) => {
    setImages(images.map((item) => (item.id === id ? { ...item, alt } : item)))
  }

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)

      setImages(images.map((item) => (item.id === id ? { ...item, url: imageUrl, file } : item)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Profession Images</h2>
        <p className="text-sm text-gray-500">
          Upload images that represent this profession. These will be displayed in the image gallery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image) => (
          <Card key={image.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Image</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                onClick={() => removeImage(image.id)}
                disabled={images.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || "Profession image"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <Label
                    htmlFor={`image-upload-${image.id}`}
                    className="cursor-pointer bg-white text-gray-900 px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium"
                  >
                    <Upload className="h-4 w-4" />
                    Change Image
                  </Label>
                  <Input
                    id={`image-upload-${image.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(image.id, e)}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`image-alt-${image.id}`}>Alt Text</Label>
                <Input
                  id={`image-alt-${image.id}`}
                  placeholder="Describe the image for accessibility"
                  value={image.alt}
                  onChange={(e) => updateImageAlt(image.id, e.target.value)}
                />
                <p className="text-xs text-gray-500">Provide a description of the image for screen readers and SEO.</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full" onClick={addImage}>
        <Plus className="h-4 w-4 mr-2" />
        Add Image
      </Button>
    </div>
  )
}
