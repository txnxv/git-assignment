import { Contact } from "@/types/contact";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Pencil, Trash2 } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  const fullName = `${contact.first_name} ${contact.last_name || ""}`.trim();
  const initials = `${contact.first_name[0]}${contact.last_name?.[0] || ""}`.toUpperCase();

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in-fade">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 flex flex-col items-center text-center space-y-4">
        <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg transition-transform duration-300 group-hover:scale-110">
          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-display">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 w-full">
          <h3 className="font-display text-xl font-semibold text-foreground">
            {fullName}
          </h3>

          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              <a href={`tel:${contact.phone}`}>
                {contact.phone}
              </a>
            </div>

            {contact.email && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${contact.email}`} className="truncate">
                  {contact.email}
                </a>
              </div>
            )}
          </div>

          {contact.address && (
            <p className="text-sm text-muted-foreground pt-2 line-clamp-2">
              {contact.address}
            </p>
          )}
        </div>

        <div className="flex gap-2 w-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(contact)}
            className="flex-1 border-primary/20 hover:bg-primary hover:text-primary-foreground"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(contact.contact_id)}
            className="flex-1 border-destructive/20 hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
