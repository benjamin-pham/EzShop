import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { User, Plus } from "lucide-react";

export default function AvatarShowcase() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Default</h2>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Sizes</h2>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="default">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">lg</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Fallback</h2>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Badge</h2>
        <div className="flex gap-4 items-end">
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-500" />
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-500" />
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-500" />
          </Avatar>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Avatar Group</h2>
        <div className="flex gap-4 items-center">
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Avatar Group Sizes</h2>
        <div className="flex flex-col gap-6">
          <AvatarGroup className="group" data-size="sm">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>

          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>

          <AvatarGroup className="group" data-size="lg">
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>
              <Plus className="size-4" />
            </AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>
    </div>
  );
}
