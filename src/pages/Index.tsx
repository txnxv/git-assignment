import { useState, useEffect } from "react";
import { Contact } from "@/types/contact";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users } from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://localhost:4000/api/contacts";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Fetch contacts from backend
  const fetchContacts = async (query = "") => {
    try {
      const res = await fetch(query ? `${API_URL}?q=${encodeURIComponent(query)}` : API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchContacts(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSaveContact = async (contactData: Omit<Contact, "contact_id" | "created_at"> & { contact_id?: number }) => {
    try {
      if (contactData.contact_id) {
        // Edit
        const res = await fetch(`${API_URL}/${contactData.contact_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        });
        if (!res.ok) throw new Error("Failed to update contact");
        toast.success("Contact updated successfully!");
      } else {
        // Add
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        });
        if (!res.ok) throw new Error("Failed to add contact");
        toast.success("Contact added successfully!");
      }
      fetchContacts(searchQuery);
    } catch (err) {
      toast.error((err as Error).message);
    }
    setEditingContact(null);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete contact");
      toast.success("Contact deleted successfully!");
      fetchContacts(searchQuery);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleAddNew = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Contact Book
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your connections
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleAddNew}
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Contact
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts by name, email, phone, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </header>

      {/* Contacts Grid */}
      <main className="container mx-auto px-4 py-8">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in-fade">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-2">
              {searchQuery ? "No contacts found" : "No contacts yet"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Get started by adding your first contact"}
            </p>
            {!searchQuery && (
              <Button onClick={handleAddNew} size="lg" className="bg-primary hover:bg-primary/90">
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Contact
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
                {searchQuery && " found"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {contacts.map((contact, index) => (
                <div
                  key={contact.contact_id}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  className="animate-in-slide"
                >
                  <ContactCard
                    contact={contact}
                    onEdit={handleEditContact}
                    onDelete={handleDeleteContact}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Contact Form Dialog */}
      <ContactForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveContact}
        editingContact={editingContact}
      />
    </div>
  );
};

export default Index;
