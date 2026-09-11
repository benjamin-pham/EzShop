import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AspectRatioShowcase() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Aspect Ratio</h2>
        <p className="text-muted-foreground">
          Displays content within a desired ratio.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 16:9 Aspect Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>16:9 Aspect Ratio</CardTitle>
            <CardDescription>
              Common for widescreen videos and images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-sm overflow-hidden rounded-md border shadow-sm">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Mountain landscape"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* 4:3 Aspect Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>4:3 Aspect Ratio</CardTitle>
            <CardDescription>
              Traditional photography and standard definition screens.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-sm overflow-hidden rounded-md border shadow-sm">
              <AspectRatio ratio={4 / 3} className="bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Mountain landscape"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* 1:1 Aspect Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>1:1 Aspect Ratio</CardTitle>
            <CardDescription>
              Perfect for profile pictures and square grids.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-sm overflow-hidden rounded-md border shadow-sm">
              <AspectRatio ratio={1 / 1} className="bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Mountain landscape"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* 21:9 Aspect Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>21:9 Aspect Ratio</CardTitle>
            <CardDescription>
              Cinematic ultrawide format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-hidden rounded-md border shadow-sm">
              <AspectRatio ratio={21 / 9} className="bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Mountain landscape"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* Map Example */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Embed Example (Map)</CardTitle>
            <CardDescription>
              Using aspect ratio for embedded content like maps to ensure responsive sizing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-hidden rounded-md border shadow-sm">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948534!3d37.75781499660171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1709664539665!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="San Francisco Map"
                  className="h-full w-full border-0"
                ></iframe>
              </AspectRatio>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
