import fitz
import re

def extract_text_from_pdf(pdf_path, specific_page=0):
    """Extract text from a PDF and optionally print text from a specific page, removing footers and organizing content."""
    text = ""
    try:
        with fitz.open(pdf_path) as pdf:
            for page_num in range(len(pdf)):
                page = pdf[page_num]
                blocks = page.get_text("blocks")
                
                # Sort blocks by their vertical position on the page
                blocks.sort(key=lambda b: b[1])
                
                page_text = ""
                for block in blocks:
                    block_text = block[4].strip()
                    if block_text:
                        page_text += block_text + "\n"
                
                text += page_text + "\n"
                
                if specific_page is not None and page_num == specific_page - 1:
                    print(f"Text from page {specific_page}:\n{page_text}")
        
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def postprocess_text(raw_text):
    # Define regex patterns for sections and key headings
    heading_patterns = [
        re.compile(r"(?i)(^2nd Capstone.*$)"),  # For title headers like "2nd Capstone"
        re.compile(r"(?i)(^Reason and Description of Project$)"),
        re.compile(r"(?i)(^Technical Solution$)"),
        re.compile(r"(?i)(^Other Data$)"),
        re.compile(r"(?i)(^Confidential.*$)"),
        re.compile(r"(?i)(^Project-Team$)"),
    ]
    
    # Split raw text into lines
    lines = raw_text.split("\n")
    
    # Prepare lists to hold formatted content
    formatted_content = []
    
    # Flag for recognizing if the line is a heading or regular content
    is_in_heading = False
    
    # Iterate over the lines and apply formatting rules
    for line in lines:
        # Check if line matches any heading patterns
        for pattern in heading_patterns:
            if pattern.match(line.strip()):
                formatted_content.append(f"\n**{line.strip()}**\n")
                is_in_heading = True
                break
        else:
            # If it's a bullet point, process it as one
            if line.strip().startswith('•'):
                formatted_content.append(f"  - {line.strip()[1:].strip()}")
            # Else treat it as normal text
            elif line.strip():
                if not is_in_heading:
                    formatted_content.append(f"  {line.strip()}")
                else:
                    formatted_content.append(f"{line.strip()}")
                    is_in_heading = False
    
    # Join all formatted content and return as final output
    formatted_text = "\n".join(formatted_content)
    
    # Postprocess for section breaks and reformat
    formatted_text = re.sub(r'(?<=\n)(\s*\n)+', '\n\n', formatted_text)  # Remove excessive blank lines
    formatted_text = formatted_text.replace("•", "-")  # Convert bullet points (if needed)
    
    return formatted_text


# # Example usage
# raw_text = extract_text_from_pdf(r"C:\Users\simonst\projects\managex\Investanträge\B24-03_2nd_Capstone_Investrequest_finale.pdf")
# formatted_text = postprocess_text(raw_text)

# # Print formatted text
# print(formatted_text)
