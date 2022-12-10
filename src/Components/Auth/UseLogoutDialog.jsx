// create uselogoutdialog
import { useState } from 'react';

export default function UseLogoutDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return { isOpen, onOpen, onClose };
}

