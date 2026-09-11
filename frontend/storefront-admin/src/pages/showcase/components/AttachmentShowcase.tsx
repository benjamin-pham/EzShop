import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger
} from "@/components/ui/attachment";
import { Download, FileIcon, X, Loader2, FileWarning, RefreshCcw } from "lucide-react";
export default function AttachmentShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic</h2>
        <div className="flex flex-col gap-4 p-6 border rounded-xl bg-muted/40">
          <Attachment>
            <AttachmentMedia>
              <FileIcon className="text-muted-foreground" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>document.pdf</AttachmentTitle>
              <AttachmentDescription>1.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </section>

      {/* Media Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Media Variants</h2>
        <p className="text-sm text-muted-foreground">Attachments can show icons or image thumbnails.</p>
        <div className="flex gap-4 p-6 border rounded-xl bg-muted/40 flex-wrap">
          <Attachment>
            <AttachmentMedia variant="icon">
              <FileIcon className="text-muted-foreground" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>invoice.pdf</AttachmentTitle>
              <AttachmentDescription>250 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment>
            <AttachmentMedia variant="image">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80" alt="thumbnail" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office.jpg</AttachmentTitle>
              <AttachmentDescription>3.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <Download />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-4 p-6 border rounded-xl bg-muted/40 items-start">
          <Attachment size="default">
            <AttachmentMedia>
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>size-default.pdf</AttachmentTitle>
              <AttachmentDescription>2.5 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment size="sm">
            <AttachmentMedia>
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>size-sm.pdf</AttachmentTitle>
              <AttachmentDescription>1.1 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost" size="icon-xs">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment size="xs">
            <AttachmentMedia>
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>size-xs.pdf</AttachmentTitle>
              <AttachmentDescription>500 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost" size="icon-xs">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </section>

      {/* Orientations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Orientation</h2>
        <div className="flex gap-4 p-6 border rounded-xl bg-muted/40 flex-wrap">
          <Attachment orientation="horizontal">
            <AttachmentMedia variant="image">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80" alt="office" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>horizontal.jpg</AttachmentTitle>
              <AttachmentDescription>3.4 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80" alt="architecture" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>vertical.jpg</AttachmentTitle>
              <AttachmentDescription>2.1 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="secondary" size="icon-xs" className="rounded-full shadow-sm">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-col gap-4 p-6 border rounded-xl bg-muted/40 max-w-sm">
          <Attachment state="idle">
            <AttachmentMedia>
              <FileIcon className="text-muted-foreground" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>idle-state.pdf</AttachmentTitle>
              <AttachmentDescription>Waiting to upload...</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="uploading">
            <AttachmentMedia>
              <Loader2 className="animate-spin text-muted-foreground" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>video.mp4</AttachmentTitle>
              <AttachmentDescription>Uploading (45%)</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="processing">
            <AttachmentMedia>
              <Loader2 className="animate-spin text-muted-foreground" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>large_dataset.csv</AttachmentTitle>
              <AttachmentDescription>Processing...</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="error">
            <AttachmentMedia>
              <FileWarning />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>presentation.pptx</AttachmentTitle>
              <AttachmentDescription>Failed to upload. File too large.</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <RefreshCcw />
              </AttachmentAction>
              <AttachmentAction variant="ghost">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="done">
            <AttachmentMedia>
              <FileIcon className="text-muted-foreground" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>done.pdf</AttachmentTitle>
              <AttachmentDescription>100% Uploaded</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction variant="ghost">
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </section>

      {/* Group */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Attachment Group</h2>
        <div className="p-6 border rounded-xl bg-muted/40">
          <AttachmentGroup className="w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Attachment key={i} orientation="vertical">
                <AttachmentMedia variant="image">
                  <img src={`https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80&sig=${i}`} alt="img" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>img_{i}.jpg</AttachmentTitle>
                  <AttachmentDescription>1.2 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction variant="secondary" size="icon-xs" className="rounded-full shadow-sm bg-background/80 backdrop-blur-sm">
                    <X />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </AttachmentGroup>
        </div>
      </section>

      {/* Interactive Trigger Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive / Trigger</h2>
        <p className="text-sm text-muted-foreground">Using AttachmentTrigger to make the attachment clickable (e.g. for previewing).</p>
        <div className="flex gap-4 p-6 border rounded-xl bg-muted/40">
          <Attachment className="hover:bg-muted/60 cursor-pointer transition-colors">
            <AttachmentTrigger onClick={() => alert("Preview clicked!")} />
            <AttachmentMedia variant="image">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80" alt="office" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Click to preview</AttachmentTitle>
              <AttachmentDescription>3.4 MB</AttachmentDescription>
            </AttachmentContent>
            {/* Action buttons sit above the trigger z-index automatically */}
            <AttachmentActions>
              <AttachmentAction variant="ghost" onClick={(e) => { e.stopPropagation(); alert("Deleted!"); }}>
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </section>
    </div>
  );
}
