export interface StorePerm {
  read: 'desk' | 'our' | 'any';
  write: 'desk' | 'our' | 'any';
}

export interface StashPerm {
  read: 'desk' | 'our' | 'any' | 'unset';
  write: 'desk' | 'our' | 'any' | 'unset';
}