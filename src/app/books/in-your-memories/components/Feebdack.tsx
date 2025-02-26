import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";

// Feedback Component
export function Feedback() {
  const githubIssueLink =
    "https://github.com/rovaa-org/dipisha-book-website/issues";
  const emailAddress = "deepeshkalurs@gmail.com";

  return (
    <Card className="max-w-6xl mx-auto my-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-center md:text-left">
            Have suggestions or found issues? Help us improve this project.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap"
              onClick={() => window.open(githubIssueLink, "_blank")}
            >
              <SiGithub className="h-4 w-4" />
              Raise Issue
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap"
              onClick={() => window.open(`mailto:${emailAddress}`)}
            >
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
