import React from 'react';
import { Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Feedback() {
  // Replace with your actual GitHub issues link
  const githubIssueLink = "https://github.com/rovaa-org/dipisha-book-website/issues";

  return (
    <Card className="max-w-6xl mx-auto my-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-gray-600">
            Have suggestions or found issues? Help us improve this project by providing feedback created by Rovaa
          </p>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => window.open(githubIssueLink, '_blank')}
          >
            <Github className="h-4 w-4" />
            Raise Issue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}